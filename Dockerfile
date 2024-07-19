FROM amazon/aws-lambda-nodejs:18

COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.5.0 /lambda-adapter /opt/extensions/lambda-adapter
ENV PORT=3000

COPY ./next.config.js ./
COPY ./public ./public
COPY ./.next/static ./.next/static
COPY ./.next/standalone ./

ENTRYPOINT ["node"]
CMD ["server.js"]
