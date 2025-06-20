<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function get_home_data()
    {
        $categories = Category::select()->get();

        return Inertia::render('home', [
            'categories' => $categories
        ]);
    }
}
