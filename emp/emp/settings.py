from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'your-dev-secret-key')  # use env variable in production

DEBUG = os.environ.get('DJANGO_DEBUG', '') != 'False'  # toggle with Render's environment settings

ALLOWED_HOSTS = ['*']  # You can restrict this later, like ['your-app.onrender.com']

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Local apps
    'app',

    # Third-party apps
    'rest_framework',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Important: must come BEFORE CommonMiddleware
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'emp.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'template')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'emp.wsgi.application'

# ==================================
# DATABASE CONFIG (uncomment only one)
# ==================================

# 1. MongoDB using djongo (if Render supports it)
# DATABASES = {
#     'default': {
#         'ENGINE': 'djongo',
#         'NAME': 'project',
#         'ENFORCE_SCHEMA': True,
#     }
# }

# 2. MySQL (ensure DB is accessible from Render)
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'employee',
#         'USER': 'root',
#         'PASSWORD': 'yourpassword',
#         'HOST': '127.0.0.1',
#         'PORT': '3306',
#     }
# }

# You can use PostgreSQL on Render easily:
# DATABASES = {
#     'default': dj_database_url.config(default=os.environ.get('DATABASE_URL'))
# }

# ==================================
# PASSWORD VALIDATORS
# ==================================
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# ==================================
# INTERNATIONALIZATION
# ==================================
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ==================================
# STATIC & MEDIA CONFIG
# ==================================
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# For Render static files support
if not DEBUG:
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
    MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')

# ==================================
# REST FRAMEWORK SETTINGS
# ==================================
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}

# ==================================
# CORS SETTINGS (Frontend allowed origins)
# ==================================
CORS_ALLOW_ALL_ORIGINS = True  # For full access — you can tighten it as below
# CORS_ALLOWED_ORIGINS = [
#     'http://localhost:3000',
#     'https://your-frontend.onrender.com',
# ]
