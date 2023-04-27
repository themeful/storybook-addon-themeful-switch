// /my-addon/src/preset.ts

function managerEntries(entry: any = []) {
  return [...entry, require.resolve('./register')]; //👈 Addon implementation
}

export default { managerEntries };