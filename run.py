import io
import os
import uuid
from wsgiref.util import FileWrapper

from django.conf import settings
from django.http import HttpResponse
from django.urls import path

DEBUG = True
ROOT_URLCONF = 'run'
ALLOWED_HOSTS = '*'
DATABASES = {'default': {}}

if not settings.configured:
    settings.configure(**locals())


# # helper function to locate this dir
# def here(x):
#     return os.path.join(os.path.abspath(os.path.dirname(__file__)), x)


def post(request):
    html_content = request.body.decode('utf-8')
    filename = '/tmp/{}.html'.format(uuid.uuid4())

    with open(filename, 'w') as temp_file:
        temp_file.write(html_content)

    file = os.path.abspath(filename)
    cmd_options = {'printBackground': True}
    from puppeteer_pdf import convert_to_pdf
    short_report = io.BytesIO(convert_to_pdf(file, cmd_options=cmd_options))
    response = HttpResponse(FileWrapper(short_report), content_type='application/pdf')
    return response


urlpatterns = [
    path('', post),
]

SECRET_KEY = "not so secret"

if __name__ == "__main__":
    # set the ENV
    # sys.path += (here("."),)
    # run the development server
    from django.core import management

    management.execute_from_command_line()


# python run.py runserver 0.0.0.0:8000
