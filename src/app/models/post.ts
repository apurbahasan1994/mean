export class Post {
  id: string;
  title: string;
  content: string;
  imagePath: string;
  constructor(id, title, content, imagePath) {
    this.title = title
    this.content = content
    this.id = id
    this.imagePath = imagePath
  }
}
