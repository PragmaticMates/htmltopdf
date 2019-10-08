FROM python:3.7-alpine

RUN apk add --update npm
RUN npm install -g puppeteer-pdf --unsafe-perm

COPY requirements.txt /
RUN pip install -r /requirements.txt

COPY . /app
WORKDIR /app
CMD python ./run.py runserver 0.0.0.0:${PORT:-8000}
