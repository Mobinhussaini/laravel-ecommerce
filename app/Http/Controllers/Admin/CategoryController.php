<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function save_category(Request $request){
        $request->validate([
            'name'=>'string|required|max:255',
            'description'=> 'string|nullable',
            'color'=>'string|required',
            'image'=>'image|nullable|max:2048',
        ]);

        $slug = Str::slug($request->name);
        $image  = '';

        if($request->hasFile('image')){
            $image = $request->file('image')->store('categories', 'public');
        }

        $new_category=[
            'name'=>$request->name,
            'slug'=>$slug,
            'description'=>$request->description,
            'image'=>$image,
            'color'=>$request->color,
        ];


        Category::create($new_category);

        return redirect('/dashboard/categories');
    }

    public function list_categories(){
        $categories = Category::latest()->get();

        return Inertia::render("dashboard/categories/index", [
            'categories'=> $categories
        ]);
    }
}
