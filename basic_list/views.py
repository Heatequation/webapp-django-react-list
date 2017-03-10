from basic_list.models import Entry
from basic_list.serializers import EntrySerializer
from rest_framework import mixins
from rest_framework import generics
from django.http import HttpResponse


def index(request):
    return HttpResponse("You are at the index of basic_list!")


class EntryList(generics.ListCreateAPIView):
    queryset = Entry.objects.all().order_by('-date')
    serializer_class = EntrySerializer

class EntryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer
