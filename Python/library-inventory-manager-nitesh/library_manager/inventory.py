# library_manager/inventory.py

import json
import logging
import os
from .book import Book

# logging the data 
logging.basicConfig(level=logging.INFO)

class LibraryInventory:
    def __init__(self):
        self.books = [] 
        self.filename = "library_data.json"
        self.load_books() 

    # adding books to the lists
    def add_book(self, title, author, isbn):
        # First, check if it exists
        if self.search_by_isbn(isbn) != None:
            print("Error: Book with this ISBN already exists.")
            return

        new_book = Book(title, author, isbn)
        self.books.append(new_book)
        self.save_books() # Save immediately
        print("Book added successfully!")
        logging.info("New book added.")

    # searching by title of the book
    def search_by_title(self, text):
        found = []
        for b in self.books:
            if text.lower() in b.title.lower():
                found.append(b)
        return found

    # searching by Isbn no.
    def search_by_isbn(self, isbn):
        for b in self.books:
            if b.isbn == isbn:
                return b
        return None

    # showing all the books
    def display_all(self):
        print("\n--- Library Catalog ---")
        if len(self.books) == 0:
            print("No books found.")
        
        for b in self.books:
            print(b) 

    # saving the json file 
    def save_books(self):
        try:
            temp_list = []
            for b in self.books:
                temp_list.append(b.to_dict())
            
            # write function
            with open(self.filename, 'w') as f:
                json.dump(temp_list, f)
                
        except Exception as e:
            logging.error("Could not save file.")

    # it load data from json file
    def load_books(self):
        try:
            if not os.path.exists(self.filename):
                return 
            
            with open(self.filename, 'r') as f:
                data = json.load(f)
                
                #converting dicts to book objects
                for item in data:
                    b = Book(item['title'], item['author'], item['isbn'], item['status'])
                    self.books.append(b)
                    
        except Exception:
            logging.error("Error loading file. Starting fresh.")
            self.books = []