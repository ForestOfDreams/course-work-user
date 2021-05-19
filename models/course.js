class Course {
  constructor(
    checked,
    country,
    description,
    finishDate,
    id,
    language,
    name,
    price,
    reviews,
    startDate,
    image,
    rating,
    subject
  ) {
    this.checked = checked;
    this.country = country;
    this.description = description;
    this.finishDate = finishDate;
    this.id = id;
    this.language = language;
    this.name = name;
    this.price = price;
    this.reviews = reviews;
    this.startDate = startDate;
    this.image = image;
    this.rating = rating;
    this.subject = subject;
  }
}

export default Course;
