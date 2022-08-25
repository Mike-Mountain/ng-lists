export function createUserQueryString() {
  let queryString = '';
  queryString += '[listsCreated][populate][editors][fields][0]=id';
  queryString +=
    '&populate[listsCreated][populate][editors][fields][1]=username';
  queryString += '&populate[listsEditor][populate][editors][fields][0]=id';
  queryString +=
    '&populate[listsEditor][populate][editors][fields][1]=username';
  queryString += '&populate[listsCreated][populate][listItems]=*';
  queryString += '&populate[listsEditor][populate][listItems]=*';
  queryString += '&populate[groupsEditor][populate][members][fields][0]=id';
  queryString +=
    '&populate[groupsCreated][populate][members][fields][1]=username';
  queryString += '&populate[groupsCreated][populate][user][fields][0]=id';
  queryString +=
    '&populate[groupsCreated][populate][user][fields][1]=username';
  queryString += '&populate[groupsMembers][populate][members][fields][0]=id';
  queryString +=
    '&populate[groupsMembers][populate][members][fields][1]=username';
  queryString += '&populate[groupsMembers][populate][user][fields][0]=id';
  queryString +=
    '&populate[groupsMembers][populate][user][fields][1]=username';
  return queryString;
}

export function createListsQueryString() {
  let queryString = '';
  queryString += '[listItems][populate]=*';
  queryString += '&populate[user][fields][0]=id';
  queryString += '&populate[user][fields][1]=username';
  queryString += '&populate[icon]=*';
  queryString += '&populate[group][fields][0]=id';
  queryString += '&populate[group][fields][1]=name';
  queryString += '&populate[editors][fields][0]=id'
  queryString += '&populate[editors][fields][1]=username'
  return queryString;
}
