import type { ProofReadingItem } from '../types'

export const getProofReading = (orderId: string, idToken: string): Promise<ProofReadingItem[]> => {
  return fetch(`${process.env.NEXT_PUBLIC_AWS_PROOF_READING_API_URL}?orderId=${orderId}`, {
    headers: {
      Authorization: idToken
    }
  }).then((res) => res.json())
}
