'use client';

import { Link, Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  sx?: object;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, sx = {} }) => {
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <MuiBreadcrumbs sx={{ mb: 3, ...sx }}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        if (isLast || !item.href) {
          return (
            <Typography key={index} color="text.primary">
              {item.label}
            </Typography>
          );
        }

        return (
          <Link
            key={index}
            color="inherit"
            underline="hover"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation(item.href!);
            }}
            sx={{ cursor: 'pointer' }}
          >
            {item.label}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;