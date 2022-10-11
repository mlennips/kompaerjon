from django.contrib.auth.models import User, Group
from rest_framework import serializers

from backend.api.models import Comparison, ComparisonEntry


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class ComparisonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comparison
        fields = ['id', 'user', 'created', 'updated', 'shareKey', 'name', 'description', 'searchScheme']

class ComparisonEntrySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ComparisonEntry
        fields = ['id', 'comparison', 'created', 'updated', 'name', 'comment', 'url', 'price', 'ratingPoints']
