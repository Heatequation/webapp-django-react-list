from rest_framework import serializers
from basic_list.models import Entry


class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = ('id', 'text', 'date', 'category', 'weight')
