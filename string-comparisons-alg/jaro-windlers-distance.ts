

function JaroWindklerDistance(s1, s2) {
    // if either of the string is not truthy, distance is zero
    if (!s1 || !s2) return 0.0;

    s1 = s1.trim().toUpperCase();
    s2 = s2.trim().toUpperCase();
    // if strings are exact match, distance is 1
    if (s1 === s2) return 1;

    // number of matching characters
    let m = 0, mT = 0;
    const l1 = s1.length, // length of first string
        l2 = s2.length, // lefth of second string
        range = Math.floor(Math.max(l1, l2) / 2) - 1,
        m1 = Array(l1),
        m2 = Array(l2);
    let map1 = {}
    for(let i = 0; i<l1;++i){
        const char = s1[i];
        const meta = char in map1 ? map1[char] : {
            count: 0,
            pos: {}
        }
        ++meta.count;
        meta.pos[i]=true;
        map1[char] = meta;
    }
    console.log("s1 length: ", l1);
    console.log("s2 length: ", l2);
    console.log("map1: ", map1);
    for (let i = 0; i < l1; ++i) {
        const low = i >= range ? i - range : 0,
            high = i + range <= l2 ? i + range : l2 - 1;
        for (let j = low; j <= high; ++j) {
            if (m1[i] != true && m2[j] !== true && s1[i] === s2[j]) {
                ++m;
                m1[i] = m2[j] = true;
                break;
            }
        }
    }

    for(let i =0;i < l2;++i){
        const meta = map1[s2[i]];
        if(!meta || !meta.count){
            continue;
        }
        ++mT;
        --meta.count;
    }
    console.log('found matches: ', mT);
    //if no matches were found, no need to continue, and distance is zero;
    if (!m) return 0;

    let k = 0,
        trans = 0;
        
    for (i = 0; i < l1; ++i) {
        if (!m1[i]) continue;

        for (j = k; j < l2; ++j) {
            if (m2[j]) {
                k = j + 1;
             break;

            };
            
            
        }
        if (s1[i] !== s2[j]) ++trans;
    }
    /**
     * dj - Jaro distance
     * * 1/3*(m/|l1| + m/|l2| + (m - t)/m)
     * * m - number of matching characters
     * * t - half the number of transpositions
     * * |l1| length of first string
     * * |l2| length of second string
     */
    // - half the number of transpositions
    const t = trans / 2;
    let w = (m / l1 + m / l2 + (m - t) / m) / 3,
        l = 0,
        p = 0.1;
    if (w > 0.7) {
        while (s1[l] === s2[l] && l < 4) {
            ++l;
        }
        w = w + l * p * (1 - w);
    }
    return w;
}
console.log(JaroWindklerDistance('RNG-0609', 'RNG-0615'));