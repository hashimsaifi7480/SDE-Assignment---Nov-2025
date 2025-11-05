/**
 * Merges discontinuous time ranges within a given threshold.
 *
 * @param {Array<[number, number]>} ranges - Array of [start, end) ranges (unsorted, may overlap)
 * @param {number} threshold - Max gap (in ms) allowed between ranges to still be merged
 * @returns {Array<[number, number]>} - Sorted, non-overlapping merged ranges
 */

const mergeTimeRanges = (ranges, threshold) => {
  // Check if the ranges array is falsy and empty
  if (!ranges || ranges.length === 0) {
    return [];
  }

  //   sort the array based on first Element
  const sortedRanges = [...ranges].sort((a, b) => a[0] - b[0]);

  const merged = [];
  let currentRange = [sortedRanges[0][0], sortedRanges[0][1]];

  for (let i = 1; i < sortedRanges.length; i++) {
    const [currentStart, currentEnd] = currentRange;
    const [nextStart, nextEnd] = sortedRanges[i];

    // Gap is within the threshold
    if (nextStart <= currentEnd + threshold) {
      currentRange[1] = Math.max(currentEnd, nextEnd);
    } else {
      // otherwise
      merged.push([currentStart, currentEnd]);
      currentRange = [nextStart, nextEnd];
    }
  }

  merged.push([...currentRange]);

  return merged;
};

// const ranges = [
//   [1000, 2000],
//   [2900, 4000],
//   [3900, 4100],
//   [4000, 9000],
//   [9050, 9500],
// ];
// const threshold = 200;
// console.log(mergeTimeRanges(ranges, threshold));

module.exports = {
  mergeTimeRanges,
};
