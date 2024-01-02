"""HelloWorld URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

"""
here is default code
from django.conf.urls import url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
]
"""

from . import view
urlpatterns = [
    url(r'^$', view.hello),
]

# path() setting if necessary
# from django.urls import include, re_path

# urlpatterns = [
#     re_path(r'^index/$', views.index, name='index'),
#     re_path(r'^bio/(?P<username>\w+)/$', views.bio, name='bio'),
#     re_path(r'^weblog/', include('blog.urls')),
#     ...
# ]
