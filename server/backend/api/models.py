from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Comparison(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField()
    updated = models.DateTimeField(auto_now = True, blank = True)
    name = models.CharField(max_length=128)
    description = models.TextField()
    searchScheme = models.TextField(max_length=128)

class ComparisonShare(models.Model):
    id = models.BigAutoField(primary_key=True)
    comparison =  models.ForeignKey(Comparison, on_delete=models.CASCADE)
    created = models.DateTimeField()
    updated = models.DateTimeField(auto_now = True, blank = True)
    lastAccess = models.DateField()
    validUntil = models.DateField()
    name = models.CharField(max_length=128)

class ComparisonAttribute(models.Model):
    id = models.BigAutoField(primary_key=True),
    comparison =  models.ForeignKey(Comparison, on_delete=models.CASCADE)
    created = models.DateTimeField()
    updated = models.DateTimeField(auto_now = True, blank = True)
    key = models.CharField(max_length=128)
    name = models.CharField(max_length=128)
    searchWords = models.TextField()
    ratingPoints = models.IntegerField()

class ComparisonEntry(models.Model):
    id = models.BigAutoField(primary_key=True),
    comparison =  models.ForeignKey(Comparison, on_delete=models.CASCADE)
    created = models.DateTimeField()
    updated = models.DateTimeField(auto_now = True, blank = True)
    name = models.CharField(max_length=128)
    comment = models.TextField()
    url = models.URLField()
    price = models.DecimalField(),
    ratingPoints = models.IntegerField

class ComparisonEntryCheck(models.Model):
    id = models.BigAutoField(primary_key=True),
    comparisonEntry =  models.ForeignKey(ComparisonEntry, on_delete=models.CASCADE)
    comparisonAttribute = models.ForeignKey(ComparisonAttribute, on_delete=models.CASCADE)
    created = models.DateField()
    updated = models.DateField()
    comment = models.TextField()
    additionalCosts = models.DecimalField(decimal_places=2, max_digits=8)
    state = models.BooleanField(),
    value = models.TextField