<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::get('/product-details', function () {
    return Inertia::render('product-details');
})->name('product.details');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard/index');
    })->name('dashboard');

    Route::get('/dashboard/products', function () {
        return Inertia::render('dashboard/products/index');
    })->name('products.index');

    Route::get('dashboard/categories', function () {
        return Inertia::render('dashboard/categories/index');
    })->name('categories.index');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
