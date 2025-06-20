<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Shop\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'get_home_data'])->name('home');

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

    Route::get('dashboard/categories', [CategoryController::class, 'list_categories'])->name('categories.index');

    Route::post('dashboard/categories',
            [CategoryController::class, 'save_category'])
        ->name('categories.insert');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
