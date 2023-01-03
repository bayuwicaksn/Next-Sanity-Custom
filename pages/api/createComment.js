import SanityClient from '@sanity/client'

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  useCdn: true,
}
const client = SanityClient(config)

export default async function createComment(req, res) {
  const { _id, name, email, comment } = JSON.parse(req.body)

  try {
    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      email,
      comment,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Gagal submit comment', err })
  }
  console.log('commented')
  return res.status(200).json({ message: 'Comment Submitted' })
}
