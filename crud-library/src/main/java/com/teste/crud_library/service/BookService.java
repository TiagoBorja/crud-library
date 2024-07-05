package com.teste.crud_library.service;

import com.teste.crud_library.model.entity.Book;
import com.teste.crud_library.repository.BookRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Optional<Book> getBookById(Long id){
        return bookRepository.findById(id);
    }

    public List<Book> create(Book book) {
        if(book.getAuthor() == null || book.getAuthor().isEmpty())
            throw new IllegalArgumentException("Author cannot be empty");

        bookRepository.save(book);
        return list();
    }

    public List<Book> list() {
        Sort sort = Sort.by("name").ascending();
        return bookRepository.findAll(sort);
    }

    public Book updateBook(Long id, Book bookDetails){
        Optional<Book> bookOptional = bookRepository.findById(id);

        if(bookOptional.isPresent()){
            Book book = bookOptional.get();
            book.setName(bookDetails.getName());
            book.setAuthor(bookDetails.getAuthor());
            book.setDescription(bookDetails.getDescription());

            return bookRepository.save(book);
        }else{
            throw new RuntimeException("Book not found by with id: " + id);
        }
    }

    public List<Book> delete(Long id) {
        bookRepository.deleteById(id);
        return list();
    }
}
