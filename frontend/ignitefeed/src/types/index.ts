interface Author {
  avatarUrl: string
  name: string
  role: string
}

interface Content {
  type: 'paragraph' | 'link'
  content: string
}

export interface Posts {
  id?: number
  author: Author
  content: Content[]
  publishedAt: Date
}
