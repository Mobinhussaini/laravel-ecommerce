<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'original_price',
        'old_price',
        'rating',
        'review_count',
        'features',
        'image',
        'gallery',
        'colors',
        'sizes',
        'stock',
        'is_featured',
        'is_active',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'features' => 'array',
        'sizes' => 'array',
        'gallery' => 'array',
        'colors' => 'array',
        'price' => 'decimal:2',
        'original_price' => 'decimal:2',
        'old_price' => 'decimal:2',
        'rating' => 'decimal:1',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function scopeSimilar($query, $productId)
    {
        $product = static::firstOrFail($productId);

        return $query->where('category_id', $product->category_id)->where('id', '!=', $productId);
    }
}
