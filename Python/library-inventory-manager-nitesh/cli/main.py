import sys
import os

# this is used for the Python to find the library manager folder.
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from library_manager.inventory import LibraryInventory

def main():
    library = LibraryInventory()

    while True:
        print("\n---LIBRARY MENU ---")
        print("1. Add Book")
        print("2. Issue Book")
        print("3. Return Book")
        print("4. View All")
        print("5. Search")
        print("6. Exit")
        
        choice = input("Enter choice: ")

        if choice == '1':
            t = input("Title: ")
            a = input("Author: ")
            i = input("ISBN: ")
            if t != "" and i != "":
                library.add_book(t, a, i)
            else:
                print("Title and ISBN are required!")

        elif choice == '2':
            i = input("Enter ISBN to issue: ")
            book = library.search_by_isbn(i)
            if book:
                if book.issue():
                    library.save_books()
                    print("Book Issued!")
                else:
                    print("Already issued.")
            else:
                print("Book not found.")

        elif choice == '3':
            i = input("Enter ISBN to return: ")
            book = library.search_by_isbn(i)
            if book:
                if book.return_book():
                    library.save_books()
                    print("Book Returned!")
                else:
                    print("It was not issued.")
            else:
                print("Book not found.")

        elif choice == '4':
            library.display_all()

        elif choice == '5':
            txt = input("Search Title: ")
            results = library.search_by_title(txt)
            for r in results:
                print(r)

        elif choice == '6':
            print("Bye!")
            break
        
        else:
            print("Invalid option.")

if __name__ == "__main__":
    main()