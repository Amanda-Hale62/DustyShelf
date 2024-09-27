package org.example.dustyshelfinventory.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final BookRepository bookRepository;

    @Autowired
    public DataLoader(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        bookRepository.save(new Book("org.example.dustyshelfinventory.book.Book 1", "Author 1", "123456", 19.99));
        bookRepository.save(new Book("org.example.dustyshelfinventory.book.Book 2", "Author 2", "789101", 29.99));
    }
}
