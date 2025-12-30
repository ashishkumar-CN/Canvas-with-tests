package com.yfdecor.config;

import com.yfdecor.model.Category;
import com.yfdecor.model.Product;
import com.yfdecor.repository.CategoryRepository;
import com.yfdecor.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        seedCategory("Crystal Paintings", "crystal-paintings", "Premium Crystal Glass Art", "https://yfdecor.com/wp-content/uploads/2024/11/YFCH-035-img-gold-frame-300x300.webp");
        seedCategory("Canvas Art", "canvas-paintings", "Modern Canvas Prints", "https://yfdecor.com/wp-content/uploads/2024/08/YFCBU-019-img1-300x300.webp");
        seedCategory("Wallpapers", "wallpapers", "Luxurious Wallpapers", "https://yfdecor.com/wp-content/uploads/2024/08/YFCF-042-img2-300x300.webp");
        seedCategory("Gear Clocks", "gear-clocks", "Mechanical Moving Gear Clocks", "https://yfdecor.com/wp-content/uploads/2024/08/YFCS-008-img1-300x300.webp");
        seedCategory("Spiritual", "spiritual-paintings", "Divine and Spiritual Art", "https://yfdecor.com/wp-content/uploads/2025/11/hanuman-category-img-300x300.jpg");
        seedCategory("Abstract", "abstract-art", "Abstract Modern Art", "https://yfdecor.com/wp-content/uploads/2024/08/YFCA-040-img1-300x300.webp");
        seedCategory("Nature", "nature-paintings", "Serene Nature Landscapes", "https://yfdecor.com/wp-content/uploads/2024/08/YFCL-011-img1-300x300.webp");
    }

    private void seedCategory(String name, String slug, String description, String imageUrl) {
        if (!categoryRepository.existsBySlug(slug)) {
            Category category = Category.builder()
                    .name(name)
                    .slug(slug)
                    .description(description)
                    .imageUrl(imageUrl)
                    .build();
            Category savedCategory = categoryRepository.save(category);
            
            // Seed a sample product for this category
            Product product = Product.builder()
                    .name(name + " Sample Product")
                    .slug(slug + "-sample-" + System.currentTimeMillis())
                    .description("This is a premium " + name + " for your home.")
                    .price(4999.0)
                    .stock(10)
                    .imageUrl(imageUrl)
                    .category(savedCategory)
                    .build();
            productRepository.save(product);
            
            System.out.println("Seeded category: " + name);
        }
    }
}
