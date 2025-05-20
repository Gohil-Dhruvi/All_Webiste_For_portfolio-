// Binary Search for portfolio filtering
class PortfolioFilter {
    constructor(items) {
        this.items = items;
        this.sortedItems = [...items].sort((a, b) => a.title.localeCompare(b.title));
    }

    // Binary search implementation
    binarySearch(title) {
        let left = 0;
        let right = this.sortedItems.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const midTitle = this.sortedItems[mid].title;

            if (midTitle === title) {
                return this.sortedItems[mid];
            } else if (midTitle < title) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return null;
    }

    // Filter by category using hash map
    filterByCategory(category) {
        const categoryMap = {};
        this.items.forEach(item => {
            if (!categoryMap[item.category]) {
                categoryMap[item.category] = [];
            }
            categoryMap[item.category].push(item);
        });

        return categoryMap[category] || [];
    }

    // Sort by date using merge sort
    sortByDate() {
        return this.mergeSort([...this.items], (a, b) => new Date(b.projectDate) - new Date(a.projectDate));
    }

    // Merge sort implementation
    mergeSort(arr, compareFn) {
        if (arr.length <= 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const left = this.mergeSort(arr.slice(0, mid), compareFn);
        const right = this.mergeSort(arr.slice(mid), compareFn);

        return this.merge(left, right, compareFn);
    }

    merge(left, right, compareFn) {
        const result = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (compareFn(left[leftIndex], right[rightIndex]) <= 0) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }

        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }
}

// Graph for blog post recommendations
class BlogRecommendationGraph {
    constructor() {
        this.adjacencyList = {};
    }

    addPost(post) {
        if (!this.adjacencyList[post._id]) {
            this.adjacencyList[post._id] = { post, edges: [] };
        }
    }

    addEdge(postId1, postId2, weight) {
        if (this.adjacencyList[postId1] && this.adjacencyList[postId2]) {
            this.adjacencyList[postId1].edges.push({ postId: postId2, weight });
            this.adjacencyList[postId2].edges.push({ postId: postId1, weight });
        }
    }

    // Dijkstra's algorithm for recommendations
    getRecommendations(startPostId, count = 3) {
        if (!this.adjacencyList[startPostId]) return [];

        const distances = {};
        const previous = {};
        const nodes = new PriorityQueue();
        const results = [];

        // Initialize distances
        for (const postId in this.adjacencyList) {
            if (postId === startPostId) {
                distances[postId] = 0;
                nodes.enqueue(postId, 0);
            } else {
                distances[postId] = Infinity;
                nodes.enqueue(postId, Infinity);
            }
            previous[postId] = null;
        }

        // Process nodes
        while (!nodes.isEmpty()) {
            const smallest = nodes.dequeue().val;
            
            if (smallest === startPostId) continue;
            
            if (distances[smallest] !== Infinity) {
                results.push({
                    post: this.adjacencyList[smallest].post,
                    score: distances[smallest]
                });
            }

            if (results.length >= count) break;

            for (const neighbor of this.adjacencyList[smallest].edges) {
                const candidate = distances[smallest] + neighbor.weight;
                if (candidate < distances[neighbor.postId]) {
                    distances[neighbor.postId] = candidate;
                    previous[neighbor.postId] = smallest;
                    nodes.enqueue(neighbor.postId, candidate);
                }
            }
        }

        return results.sort((a, b) => a.score - b.score).map(item => item.post);
    }
}

// Priority Queue for Dijkstra's algorithm
class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.values.length === 0;
    }
}

module.exports = {
    PortfolioFilter,
    BlogRecommendationGraph
};