FROM node:16-bullseye

RUN git clone https://github.com/Ing-JuanMata/INMOITTIONIC.git

WORKDIR /INMOITTIONIC

RUN npm i -g @ionic/cli

RUN npm i

CMD ionic serve -l --external

EXPOSE 8100 8200 53703 35729 