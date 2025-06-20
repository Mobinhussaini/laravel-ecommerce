<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // categories;
        $categoreis = [
            // [
            //     'name' => 'Beauty & Fragrance',
            //     'slug' => 'beauty-fragrance',
            //     'image' => 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
            //     'color' => 'bg-amber-50',
            //     // "darkColor"=> 'bg-amber-900/20',
            // ],
            // [
            //     'name' => 'Electronics',
            //     'slug' => 'electronics',
            //     'image' => 'https://images.unsplash.com/photo-166202691159-5558e9949346?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
            //     'color' => 'bg-gray-100',
            //     // "darkColor"=> 'bg-gray-800/30',
            // ],
            // [
            //     'name' => 'Health & Personal',
            //     'slug' => 'health-personal',
            //     'image' => 'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
            //     'color' => 'bg-sky-50',
            //     // "darkColor"=> 'bg-sky-900/20',
            // ],
            // [
            //     'name' => "Men's Fashion",
            //     'slug' => 'mens-fashion',
            //     'image' => 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
            //     'color' => 'bg-blue-50',
            //     // "darkColor"=> 'bg-blue-900/20',
            // ],
            [
                'name' => 'Sports & Outdoors',
                'slug' => 'sports-outdoors',
                'image' => 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                'color' => 'bg-purple-50',
                // "darkColor"=> 'bg-purple-900/20',
            ],
            [
                'name' => "Women's Fashion",
                'slug' => 'womens-fashion',
                'image' => 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                'color' => 'bg-indigo-50',
                // "darkColor"=> 'bg-indigo-900/20',
            ],
            [
                'name' => 'Automotive',
                'slug' => 'automotive',
                'image' => 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                'color' => 'bg-blue-50',
                // "darkColor"=> 'bg-blue-900/20',
            ],
            [
                'name' => 'Health & Nutrition',
                'slug' => 'health-nutrition',
                'image' => 'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                'color' => 'bg-sky-50',
                // "darkColor"=> 'bg-sky-900/20',
            ],
            [
                'name' => 'Kids Fashion',
                'slug' => 'kids-fashion',
                'image' => 'https://images.unsplash.com/photo-1543854608-fbb5c5c8a307?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                'color' => 'bg-violet-50',
                // "darkColor"=> 'bg-violet-900/20',
            ],
            [
                'name' => 'Refurbished Department',
                'slug' => 'refurbished',
                'image' => 'https://images.unsplash.com/photo-1603706585128-8d096bea0021?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                'color' => 'bg-blue-50',
                // "darkColor"=> 'bg-blue-900/20',
            ],
            [
                'name' => 'Stationary, Books & Media',
                'slug' => 'stationary-books-media',
                'image' => 'https://images.unsplash.com/photo-1599204606395-ede983886ce9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                'color' => 'bg-amber-50',
                // "darkColor"=> 'bg-amber-900/20',
            ],
            [
                'name' => 'Baby',
                'slug' => 'baby',
                'image' => 'https://images.unsplash.com/photo-1586683086816-c674f6bb3c69?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                'color' => 'bg-teal-50',
                // "darkColor"=> 'bg-teal-900/20',
            ],

        ];

        foreach ($categoreis as $category) {
            Category::create($category);
        }
    }
}
