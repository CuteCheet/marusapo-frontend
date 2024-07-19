export const AUTH_IDENTITY_POOL_CONFIG = {
  Auth: {
    identityPoolId: process.env.NEXT_PUBLIC_AWS_IDENTITY_POOL_ID,
    region: process.env.NEXT_PUBLIC_AWS_PROJECT_REGION
  }
} as const

export const STORAGE_ORDER_FILES_CONFIG = {
  Storage: {
    AWSS3: {
      bucket: process.env.NEXT_PUBLIC_AWS_ORDER_FILES_BUCKET,
      region: process.env.NEXT_PUBLIC_AWS_PROJECT_REGION
    }
  }
} as const

export const STORAGE_PROOF_READING_FILES_CONFIG = {
  Storage: {
    AWSS3: {
      bucket: process.env.NEXT_PUBLIC_AWS_PROOF_READING_FILES_BUCKET,
      region: process.env.NEXT_PUBLIC_AWS_PROJECT_REGION
    }
  }
} as const
