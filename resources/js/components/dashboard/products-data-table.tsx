'use client';

import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, FileDown, Pencil, Plus, RefreshCw, Search, Trash } from 'lucide-react';
import * as React from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link, router, useForm } from '@inertiajs/react';
import * as XLSX from 'xlsx';
import { CreateProductItem, Product } from '@/types/product';
import InputError from '../input-error';
import { Textarea } from '../ui/textarea';
import { DropzoneFileInput } from '../form-inputs/image-uploads';
import { toast } from 'sonner';

export type Product = {
    id: string;
    name: string;
    category: string;
    image: string
    price: number;
    status: 'in-stock' | 'out-stock';
};

const products: Product[] = [
    {
        id: 'prod-001',
        name: 'Wireless Headphones',
        category: 'Electronics',
        description: "",
        image: '/placeholder.jpg?height=40&width=40',
    },
    // {
    //     id: 'prod-002',
    //     name: 'Smart Watch',
    //     category: 'Electronics',

    //     image: '/placeholder.jpg?height=40&width=40',
    //     price: 249.99,
    //     status: 'in-stock',
    // },
    // {
    //     id: 'prod-003',
    //     name: 'Yoga Mat',
    //     category: 'Fitness',

    //     image: '/placeholder.jpg?height=40&width=40',
    //     price: 39.99,
    //     status: 'out-stock',
    // },
    // {
    //     id: 'prod-004',
    //     name: 'Coffee Maker',
    //     category: 'Home',

    //     image: '/placeholder.jpg?height=40&width=40',
    //     price: 89.99,
    //     status: 'in-stock',
    // },
    // {
    //     id: 'prod-005',
    //     name: 'Bluetooth Speaker',
    //     category: 'Electronics',

    //     image: '/placeholder.jpg?height=40&width=40',
    //     price: 79.99,
    //     status: 'in-stock',
    // },
    // {
    //     id: 'prod-006',
    //     name: 'Fitness Tracker',
    //     category: 'Fitness',

    //     image: '/placeholder.jpg?height=40&width=40',
    //     price: 59.99,
    //     status: 'out-stock',
    // },
];

export const columns: ColumnDef<CreateProductItem>[] = [
    {
        accessorKey: 'image',
        header: 'Image',
        cell: ({ row }) => {
            const imagePath = row.original.image || '/placeholder.jpg';
            return (
                <div className="flex items-center justify-center">
                    <img
                        src={imagePath}
                        alt={row.getValue('name')}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                    />
                </div>
            )
        },
        enableSorting: false,
    },
    {
        accessorKey: 'galary',
        header: 'Galary',
        cell: ({ row }) => {
            const galaryPath = row.original.galary || '/placeholder.jpg';
            return (
                <div className="flex items-center justify-center">
                    <img
                        src={galaryPath}
                        alt={row.getValue('name')}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                    />
                </div>
            )
        },
        enableSorting: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
    },

    {
        accessorKey: 'category',
        header: 'Suppliers',
        cell: ({ row }) => {
            const id = row.original.id;
            return (
                <Button variant="outline" size="sm">
                    <Link href={`$${id}`}>View Suppliers</Link>
                </Button>
            );
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        enableHiding: false,
        cell: ({ row }) => {
            const id = row.original.id;
            return (
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                        <Link href={`/${id}`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                    </Button>
                </div>
            );
        },
    },
];

export default function ProductsDataTable() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
    const [showAddDialog, setShowAddDialog] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [image, setImage]= React.useState();
    const [galary, setGalary]= React.useState();


    const table = useReactTable({
        data: products,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        initialState: {
            pagination: {
                pageSize: rowsPerPage,
            },
        },
    });

    React.useEffect(() => {
        table.setPageSize(rowsPerPage);
    }, [rowsPerPage, table]);

    const handleDeleteSelected = () => {
        // In a real application, you would delete the selected rows here
        console.log('Deleting selected products:', table.getFilteredSelectedRowModel().rows);
        setShowDeleteDialog(false);
        setRowSelection({});
    };

    const handleExportToExcel = () => {
        // Get visible and filtered data
        const exportData = table.getFilteredRowModel().rows.map((row) => {
            const rowData = row.original;
            return {
                Name: rowData.name,

                Price: `$${rowData.price.toFixed(2)}`,
            };
        });

        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(exportData);

        // Create workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

        // Generate Excel file and trigger download
        XLSX.writeFile(workbook, 'products.xlsx');
    };

    // Calculate total value of all products
    // const totalValue = products.reduce((sum, product) => sum + product.price * product.stock, 0);
    // const formattedTotalValue = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'USD',
    // }).format(totalValue);


    const { data, setData, post, processing, errors, reset } = useForm<Required<CreateProductItem>>({
        name: '',
        slug: '',
        image: null,
        galary: null,
        colors: '',
        description: '',
        is_featured: true,
        price: 0,
        original_price: 0,
        features: '',
        category_id: "",
    });

    const submit: React.FormEventHandler = (e) => {
        e.preventDefault();
        data.image = image[0];
        data.galary = galary[];
        console.log(data);

        router.post('/dashboard/products', data, {
            onFinish: ()=> {
                reset();
                toast.success("Product Created SUccessfully!");
            }
        })

    };


    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Products List</h2>
                        <p className="text-sm text-muted-foreground">
                            {products.length} items | Total Value: USD {formattedTotalValue}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon">
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                            <DialogTrigger asChild>
                                <Button className="bg-rose-500 hover:bg-rose-600">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add New
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[750px]">
                            <form action="" onSubmit={submit}>
                                    <DialogHeader>
                                        <DialogTitle>Add New Product</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid py-4">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Product Name</Label>
                                                <Input required id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                                <InputError message={errors.name} className="mt-2" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="colors">Category Tailwind Colors Class eg: bg-slate-100</Label>
                                                <Input required id="colors" value={data.colors} onChange={(e) => setData('colors', e.target.value)} />
                                                <InputError message={errors.colors} className="mt-2" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="price">Price</Label>
                                                <Input required id="price" value={data.price} onChange={(e) => setData('price', Number(e.target))} />
                                                <InputError message={errors.price} className="mt-2" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="original_price">Original Price</Label>
                                                <Input required id="original_price" value={data.original_price} onChange={(e) => setData('original_price', Number(e.target.value))} />
                                                <InputError message={errors.original_price} className="mt-2" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="colors">PRICE</Label>
                                                <Input required id="colors" value={data.colors} onChange={(e) => setData('colors', e.target.value)} />
                                                <InputError message={errors.colors} className="mt-2" />
                                            </div>
                                            <div className="mt-3 space-y-2">
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea
                                                id="description"
                                                rows={12}
                                                cols={30}
                                                value={data.description}
                                                placeholder="Product description ...."
                                                onChange={(e) => setData('description', e.target.value)}
                                            />
                                            <InputError message={errors.description} className="mt-2" />
                                        </div>
                                        </div>

                                        <div className="max-w-4xl py-3">
                                            <h2 className="mb-3 text-sm">Upload Product Images</h2>
                                            <div className="rounded border p-3">
                                                <DropzoneFileInput multiple={false} maxSizeMB={1} onChange={setGalary} />
                                                <InputError message={errors.image} className="mt-2" />
                                            </div>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            variant="outline"
                                            onClick={() => setShowAddDialog(false)}
                                            className="min-w-32 hover:cursor-pointer hover:bg-gray-300"
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="min-w-48 bg-blue-600 hover:cursor-pointer hover:bg-blue-800">
                                            Add New Product
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search..."
                            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                            onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                            className="pl-8"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Select defaultValue="all-time">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select time period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all-time">All Time</SelectItem>
                                <SelectItem value="today">Today</SelectItem>
                                <SelectItem value="this-week">This Week</SelectItem>
                                <SelectItem value="this-month">This Month</SelectItem>
                                <SelectItem value="this-year">This Year</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" onClick={handleExportToExcel} className="flex items-center gap-1">
                            <FileDown className="h-4 w-4" />
                            Export
                        </Button>
                    </div>
                </div>
                <div className="rounded-md">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Rows per page:</span>
                    <Select value={rowsPerPage.toString()} onValueChange={(value) => setRowsPerPage(Number(value))}>
                        <SelectTrigger className="w-[70px]">
                            <SelectValue placeholder="5" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                    <span className="text-sm text-muted-foreground">
                        Showing {table.getState().pagination.pageIndex * rowsPerPage + 1}-
                        {Math.min((table.getState().pagination.pageIndex + 1) * rowsPerPage, table.getFilteredRowModel().rows.length)} of{' '}
                        {table.getFilteredRowModel().rows.length}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        Previous
                    </Button>
                    {Array.from({ length: table.getPageCount() }).map((_, index) => (
                        <Button
                            key={index}
                            variant={table.getState().pagination.pageIndex === index ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => table.setPageIndex(index)}
                            className="h-8 w-8 p-0"
                        >
                            {index + 1}
                        </Button>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </CardFooter>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will delete {table.getFilteredSelectedRowModel().rows.length} selected product(s). This action cannot be
                            undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteSelected} className="bg-destructive text-destructive-foreground">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    );
}
