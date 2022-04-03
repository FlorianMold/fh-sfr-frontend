FROM nginx:alpine
COPY dist/apps/frontend-angular/ /usr/share/nginx/html
