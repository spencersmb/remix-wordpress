interface SearchPostResult {
  categories: string[];
  date: string;
  featuredImage: null | {
    node: IFeaturedImage
  }
  slug: string;
  title: string;
  tutorialManager: ITutorialManager;
}

interface SearchResult {
  item: SearchPostResult, 
  refIndex: number, 
  score: number
  matches: {
    indicies: number[],
    key: string
    value: string
  }
}
