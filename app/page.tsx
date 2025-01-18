"use client";

import React, { useState, useEffect, useCallback } from "react";
import { MoreHorizontal, Check, FileSpreadsheet, Cuboid, Dock, Loader, ArrowUpDown, Target, Flag, Smile, Plus, Upload, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import LemonCard from "@/components/ui/lemoncard";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/ui/sidebar"
import {Investor} from "@/types/investor";
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable, RowSelectionState, getFilteredRowModel } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { Checkbox } from "@/components/ui/checkbox"

const getRedFlagVariant = (flag: string): "destructive" => {
  return "destructive";
};

const getInvestorTypeLabel = (type: string | undefined): string => {
  switch (type?.toLowerCase()) {
    case 'angel':
      return 'Angel';
    case 'venture':
      return 'Venture';
    case 'micro':
      return 'Micro';
    default:
      return 'Angel'; // Default to 'Angel' if type is undefined or not recognized
  }
};

const LoadingOverlay = () => (
  // <div className="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-80 z-50">
  <div className="container mx-auto px-4 py-8   items-center justify-center flex h-full">
    <div className="animate-spin h-10 w-10 border-4 border-dashed border-t-4 border-gray-300 rounded-full"></div>
  </div>
);

// Add this type and columns definition before your Page component
type InvestorColumn = ColumnDef<Investor>

const columns: InvestorColumn[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <Link 
        href={`/investor/${row.original.id}`} 
        className="hover:underline"
      >
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {getInvestorTypeLabel(row.getValue("type"))}
      </Badge>
    ),
  },
  {
    accessorKey: "stage",
    header: "Stage",
  },
  {
    accessorKey: "checkSize",
    header: "Check Size",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        {row.getValue("checkSize")}
      </div>
    ),
  },
  {
    accessorKey: "sector",
    header: "Sector",
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate">
        {row.getValue("sector")}
      </div>
    ),
  },
  {
    accessorKey: "coInvestors",
    header: "Co-Investors",
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue("coInvestors")}
      </div>
    ),
  },
  {
    accessorKey: "redFlags",
    header: "Things to note",
    cell: ({ row }) => {
      const redFlags = row.getValue("redFlags") as string[];
      const isStrikeZone = row.original.strikeZone;
      const positiveAttributes = row.original.positiveAttributes as string[] || [];

      return (
        <div className="flex items-center gap-1 overflow-x-auto">
          {/* Strike Zone Badge */}
          {isStrikeZone && (
            <Badge
              className="whitespace-nowrap bg-[#E6FEEA] text-[#0E2A12] border border-green-200 flex items-center gap-1 rounded-lg py-1"
            >
              <Target className="h-3 w-3" strokeWidth={2} />
              Strike Zone
            </Badge>
          )}

          {/* Positive Attributes */}
          {!isStrikeZone && positiveAttributes.map((attribute, i) => (
            <Badge
              key={`positive-${i}`}
              className="whitespace-nowrap bg-blue-100 text-blue-800 border border-blue-200 rounded-lg py-1 flex items-center gap-1"
            >
              <Smile className="h-3 w-3" strokeWidth={3} />
              {attribute}
            </Badge>
          ))}

          {/* Red Flags */}
          {!isStrikeZone && redFlags.map((flag, i) => (
            <Badge
              key={`negative-${i}`}
              className="whitespace-nowrap bg-red-100 text-red-800 border border-red-200 rounded-lg py-1 flex items-center gap-1"
            >
              <Flag className="h-3 w-3" strokeWidth={3} />
              {flag}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>View profile</DropdownMenuItem>
          <DropdownMenuItem>Sync to database</DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="https://brdg.app/network/acme.vc" target="_blank" rel="noopener noreferrer">
              Bridge me
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Report issue</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true); // the loading state
  const [error, setError] = useState<string | null>(null); // the error state (did the loading fail?)
  const [data, setData] = useState<Investor[]>([]); // the data state i.e. the actual investors data
  const [searchInput, setSearchInput] = useState(""); // the search input state
  const [filteredData, setFilteredData] = useState<Investor[]>([]); // the filtered data state
  
  // base cases
  const [totalQualifying, setTotalQualifying] = useState(0);
  const [strikeZone, setStrikeZone] = useState(0);
  const [redFlags, setRedFlags] = useState(0);
  
  const [connectedService, setConnectedService] = useState<string | null>(null); // not sure what this is yet.
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // the function that fetches the data and sets the state
  useEffect(() => {
    console.log('Fetching data...');
    fetch('/data/investors.json')
      .then((response) => response.json())
      .then((res) => {
        let i = res.investors;
        setData(i);
        setFilteredData(i);
        setLoading(false);
        setTotalQualifying(i.length);
        setStrikeZone(i.filter((x: Investor) => x.strikeZone).length);
        setRedFlags(i.filter((x: Investor) => x.redFlags.length > 0).length);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // the function that filters the data
  useEffect(() => {
    const filterData = () => {
      if (!searchInput.trim()) return data;
      
      const searchTerms = searchInput.toLowerCase().split(' ').filter(term => term);
      
      return data.filter(investor => {
        // Check if ANY search term matches ANY field
        return searchTerms.some(term => (
          // Check main fields
          investor.name?.toLowerCase().includes(term) ||
          investor.sector?.toLowerCase().includes(term) ||
          investor.stage?.toLowerCase().includes(term) ||
          investor.type?.toLowerCase().includes(term) ||
          
          // Special handling for check size
          (term.includes('$') || term.includes('k') || term.includes('m')) && 
          isCheckSizeMatch(investor.checkSize, term)
        ));
      });
    };

    const isCheckSizeMatch = (checkSize: string | undefined, term: string) => {
      if (!checkSize) return false;
      
      // Extract number and unit from search term (e.g., "$500k" or "2m")
      const match = term.match(/(\d+)([km])?/i);
      if (!match) return false;
      
      const [, amount, unit] = match;
      const searchAmount = parseInt(amount) * (unit?.toLowerCase() === 'm' ? 1000000 : 1000);
      
      // Parse check size range (e.g., "$500K-$2M")
      const [min, max] = checkSize.split('-')
        .map(v => parseInt(v.replace(/[^0-9]/g, '')) * 
             (v.toLowerCase().includes('m') ? 1000000 : 1000));
      
      return searchAmount >= min && searchAmount <= max;
    };

    const filtered = filterData();
    setFilteredData(filtered);
    setTotalQualifying(filtered.length);
    setStrikeZone(filtered.filter(i => i.strikeZone).length);
    setRedFlags(filtered.filter(i => i.redFlags.length > 0).length);
  }, [searchInput]);

  const handleConnect = (service: string) => {
    // Open authentication window
    window.open(`https://${service.toLowerCase().replace(' ', '')}.com/auth`, '_blank');

    // Simulate successful connection after a delay
    setTimeout(() => {
      setConnectedService(service);
    }, 2000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDelete = () => {
    setUploadedImage(null);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="flex-1 transition-all duration-300 ease-in-out">
        <main className="h-full p-8">
          {/* Main container with 16:9 aspect ratio */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full aspect-video rounded-xl border border-border relative">
              <div className="absolute inset-0 flex items-center justify-center">
                {uploadedImage ? (
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded preview"
                    className="max-w-full max-h-full object-contain transition-all duration-300 ease-in-out"
                  />
                ) : (
                  // Upload prompt container
                  <div 
                    className="w-[70%] aspect-video rounded-xl relative"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                  >
                    <div className={cn(
                      "absolute inset-0 border-[5px] border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-4 transition-colors",
                      isDragging && "bg-muted/50",
                      "hover:bg-muted/50"
                    )}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="p-4 rounded-full bg-muted">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p className="text-lg text-muted-foreground font-medium">
                        Drop image here or click to upload
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Sidebar className="border-l shrink-0" />
    </div>
  )
}
