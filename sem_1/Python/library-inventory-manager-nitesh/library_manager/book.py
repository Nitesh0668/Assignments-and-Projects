# library_manager/book.py

class Book:
    # __init__ function run when the new book is created 
    def __init__(self, title, author, isbn, status="Available"):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.status = status

    def __str__(self):
        return f"{self.title} by {self.author} (ISBN: {self.isbn}) - Status: {self.status}"

    # logging
    def to_dict(self):
        return {
            "title": self.title,
            "author": self.author,
            "isbn": self.isbn,
            "status": self.status
        }

    # changing status to issue
    def issue(self):
        if self.status == "Available":
            self.status = "Issued"
            return True
        return False

    #  it change status to  available
    def return_book(self):
        if self.status == "Issued":
            self.status = "Available"
            return True
        return False

    # def check  if we can take the book or not
    def is_available(self):
        if self.status == "Available":
            return True
        else:
            return False