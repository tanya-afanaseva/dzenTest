FROM mcr.microsoft.com/playwright:v1.44.1-jammy
WORKDIR /app
RUN npx playwright install chrome
COPY . /app
RUN npm install
RUN npx playwright install --with-deps
CMD ["npm", "run", "exec"]