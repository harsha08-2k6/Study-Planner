from django.db import models
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User, Subject, Task
from .serializers import UserSerializer, SubjectSerializer, TaskSerializer

class RegisterViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ['me', 'stats']:
            return [permissions.IsAuthenticated()]
        # For list/retrieve/delete, keep IsAdminUser (staff) or check role manually
        return [permissions.IsAuthenticated()] # We will check role inside actions for safety

    def list(self, request, *args, **kwargs):
        if request.user.role != 'admin':
            return Response({"detail": "Not authorized"}, status=status.HTTP_403_FORBIDDEN)
        return super().list(request, *args, **kwargs)

    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def stats(self, request):
        if request.user.role != 'admin':
            return Response({"detail": "Not authorized"}, status=status.HTTP_403_FORBIDDEN)
        
        data = {
            'total_users': User.objects.count(),
            'total_tasks': Task.objects.count(),
            'total_subjects': Subject.objects.count(),
            'students_count': User.objects.filter(role='student').count(),
            'admins_count': User.objects.filter(role='admin').count(),
        }
        return Response(data)

    @action(detail=False, methods=['post'])
    def change_password(self, request):
        user = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        
        if not user.check_password(old_password):
            return Response({"detail": "Old password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)
        
        user.set_password(new_password)
        user.save()
        return Response({"detail": "Password updated successfully"}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['delete'])
    def delete_account(self, request, pk=None):
        user = self.get_object()
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class SubjectViewSet(viewsets.ModelViewSet):
    serializer_class = SubjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Subject.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            # Admins see all tasks (their own and all students)
            return Task.objects.all()
        # Students see their own tasks AND any tasks created by users with 'admin' role
        return Task.objects.filter(
            models.Q(user=user) | models.Q(user__role='admin')
        )

    def perform_update(self, serializer):
        was_completed = self.get_object().completed
        instance = serializer.save()
        
        # Award points on completion
        if not was_completed and instance.completed:
            user = self.request.user
            points_awarded = 10
            if instance.priority == 'high': points_awarded = 20
            user.points += points_awarded
            # Simple streak logic
            today = date.today()
            if user.last_completed_date != today:
                user.study_streak += 1
                user.last_completed_date = today
            user.save()

    @action(detail=False, methods=['get'])
    def stats_weekly(self, request):
        today = date.today()
        seven_days_ago = today - timedelta(days=6)
        tasks = Task.objects.filter(user=request.user, completed=True, updated_at__date__gte=seven_days_ago)
        
        # Aggregate by day
        stats = []
        for i in range(7):
            day = seven_days_ago + timedelta(days=i)
            count = tasks.filter(updated_at__date=day).count()
            stats.append({"day": day.strftime("%a"), "count": count})
        
        return Response(stats)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['delete'])
    def clear_completed(self, request):
        self.get_queryset().filter(completed=True).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

from django.http import HttpResponse
def home_view(request):
    return HttpResponse("<h1>Smart Study Planner API</h1><p>The backend is running. Access the API at <a href='/api/'>/api/</a> or use the <a href='http://localhost:5173'>React Frontend</a>.</p>")
