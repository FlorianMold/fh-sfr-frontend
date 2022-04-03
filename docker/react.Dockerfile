FROM nginx:alpine
COPY dist/apps/frontend-react/ /usr/share/nginx/html
