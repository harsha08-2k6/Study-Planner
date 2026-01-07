from django.contrib import admin
from django.urls import path, include
from planner.views import home_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('planner.urls')),
    path('', home_view),
]
