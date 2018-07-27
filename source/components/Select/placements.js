const autoAdjustOverflow = {
  adjustX: 0,
  adjustY: 1,
};

export const placements = {
  bottomLeft: {
    points: ['tl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
  },
  bottomRight: {
    points: ['tr', 'br'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
  },
  bottom: {
    points: ['tc', 'bc'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: autoAdjustOverflow,
  }
};

export default placements;