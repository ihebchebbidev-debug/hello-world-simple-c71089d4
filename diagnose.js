#!/usr/bin/env node
/**
 * Diagnostic script to check Vercel deployment configuration
 * Run this before deploying to verify everything is set up correctly
 */

import fs from 'fs';
import path from 'path';

console.log('\n' + '='.repeat(80));
console.log('🔍 VERCEL DEPLOYMENT DIAGNOSTIC');
console.log('='.repeat(80) + '\n');

const checks = [];

// Check 1: vercel.json exists
console.log('✓ Checking vercel.json...');
if (fs.existsSync('vercel.json')) {
  const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  console.log('  ✅ vercel.json found');
  console.log(`     - Build command: ${config.buildCommand}`);
  console.log(`     - Output directory: ${config.outputDirectory}`);
  console.log(`     - Functions: ${Object.keys(config.functions || {}).join(', ')}`);
  console.log(`     - Rewrites: ${config.rewrites?.length || 0} rules`);
  checks.push(true);
} else {
  console.log('  ❌ vercel.json NOT FOUND');
  checks.push(false);
}

// Check 2: api/index.js exists
console.log('\n✓ Checking api/index.js...');
if (fs.existsSync('api/index.js')) {
  console.log('  ✅ api/index.js found');
  const content = fs.readFileSync('api/index.js', 'utf8');
  console.log(`     - File size: ${(content.length / 1024).toFixed(2)} KB`);
  console.log(`     - Has export default: ${content.includes('export default') ? '✅' : '❌'}`);
  checks.push(true);
} else {
  console.log('  ❌ api/index.js NOT FOUND');
  checks.push(false);
}

// Check 3: package.json scripts
console.log('\n✓ Checking package.json build scripts...');
if (fs.existsSync('package.json')) {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log('  ✅ package.json found');
  console.log(`     - build: ${pkg.scripts.build}`);
  console.log(`     - Has @vercel/node: ${pkg.devDependencies['@vercel/node'] ? '✅' : '❌'}`);
  checks.push(true);
} else {
  console.log('  ❌ package.json NOT FOUND');
  checks.push(false);
}

// Check 4: vite.config.ts
console.log('\n✓ Checking vite.config.ts...');
if (fs.existsSync('vite.config.ts')) {
  console.log('  ✅ vite.config.ts found');
  const content = fs.readFileSync('vite.config.ts', 'utf8');
  console.log(`     - Has tanstackStart config: ${content.includes('tanstackStart') ? '✅' : '❌'}`);
  checks.push(true);
} else {
  console.log('  ❌ vite.config.ts NOT FOUND');
  checks.push(false);
}

// Check 5: src/server.ts
console.log('\n✓ Checking src/server.ts...');
if (fs.existsSync('src/server.ts')) {
  const content = fs.readFileSync('src/server.ts', 'utf8');
  console.log('  ✅ src/server.ts found');
  console.log(`     - Has fetch handler: ${content.includes('fetch') ? '✅' : '❌'}`);
  console.log(`     - Has error handling: ${content.includes('catch') ? '✅' : '❌'}`);
  checks.push(true);
} else {
  console.log('  ❌ src/server.ts NOT FOUND');
  checks.push(false);
}

// Summary
console.log('\n' + '='.repeat(80));
const passed = checks.filter(c => c).length;
const total = checks.length;
console.log(`\n📊 DIAGNOSTIC RESULTS: ${passed}/${total} checks passed\n`);

if (passed === total) {
  console.log('✅ ALL CHECKS PASSED - Ready to deploy to Vercel\n');
  console.log('Next steps:');
  console.log('  1. npm install');
  console.log('  2. npm run build');
  console.log('  3. npm run preview (to test locally)');
  console.log('  4. git push origin main (to deploy to Vercel)\n');
  process.exit(0);
} else {
  console.log(`❌ ${total - passed} CHECK(S) FAILED - Fix issues before deploying\n`);
  process.exit(1);
}
