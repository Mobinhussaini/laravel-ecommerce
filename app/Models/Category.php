<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    //
    // protected  $guard = ['id', 'timesptams'];
    protected $fillable = [
        'name',
        'slug',
        'color',
        'image',
        'description',
    ];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
