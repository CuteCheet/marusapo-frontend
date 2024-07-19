import type { ProofReadingRequestBody } from '../types'

export const postProofReading = (body: ProofReadingRequestBody, idToken: string) => {
  return fetch(process.env.NEXT_PUBLIC_AWS_PROOF_READING_API_URL || '', {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      Authorization: idToken,
      'Content-Type': 'application/json'
    }
  })
}
