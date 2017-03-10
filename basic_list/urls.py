from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^entries/$', views.EntryList.as_view()),
    url(r'^entries/(?P<pk>[0-9]+)/$', views.EntryDetail.as_view()),
]
