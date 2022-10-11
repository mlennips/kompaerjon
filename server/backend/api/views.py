from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from backend.api.models import Comparison, ComparisonEntry
from backend.api.serializers import ComparisonEntrySerializer, ComparisonSerializer, UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

# class GroupViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows groups to be viewed or edited.
#     """
#     queryset = Group.objects.all()
#     serializer_class = GroupSerializer
#     permission_classes = [permissions.IsAuthenticated]

class ComparisonViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows comparisons to be viewed or edited.
    """
    queryset = Comparison.objects.all()
    serializer_class = ComparisonSerializer
    permission_classes = [permissions.IsAuthenticated]

class ComparisonEntryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows comparisons to be viewed or edited.
    """
    queryset = ComparisonEntry.objects.all()
    serializer_class = ComparisonEntrySerializer
    permission_classes = [permissions.IsAuthenticated]