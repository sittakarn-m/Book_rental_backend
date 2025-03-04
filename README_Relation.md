Entities & Relationships

    User
        Has many Orders, Carts, and Rentals.
    Cart
        Belongs to User.
        Contains multiple BookOnCart items (many-to-many with Books via BookOnCart).
    Order
        Belongs to User.
        Contains multiple BookOnOrder items (many-to-many with Books via BookOnOrder).
    Rental
        Belongs to User.
        Contains multiple BookOnRental items (many-to-many with Books via BookOnRental).
    Book
        Belongs to a Category.
        Can appear in multiple BookOnCart, BookOnOrder, and BookOnRental.
    BookOnCart, BookOnOrder, BookOnRental
        Join tables for many-to-many relationships between Book and Cart/Order/Rental.