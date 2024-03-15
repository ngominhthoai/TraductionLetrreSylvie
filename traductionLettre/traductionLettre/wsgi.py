"""
WSGI config for traductionLettre project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/
"""

import os

from whitenoise import WhiteNoise

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'traductionLettre.settings')

application = get_wsgi_application()
application = WhiteNoise(application)
application.add_files('static/', prefix='more-files/')
application.add_files('media/', prefix='more-files/')
application.add_files('staticfiles/', prefix='more-files/')

