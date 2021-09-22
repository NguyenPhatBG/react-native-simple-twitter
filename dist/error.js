export default class CustomError extends Error {
    constructor(obj) {
        super(JSON.stringify(obj));
        this.name = 'TwitterAPIError';
        this.errors = obj;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxDQUFDLE9BQU8sT0FBTyxXQUFZLFNBQVEsS0FBSztJQUc1QyxZQUFZLEdBQWtCO1FBQzVCLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQztRQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUNwQixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFcnJvclJlc3BvbnNlIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1c3RvbUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBlcnJvcnM6IEVycm9yUmVzcG9uc2U7XG5cbiAgY29uc3RydWN0b3Iob2JqOiBFcnJvclJlc3BvbnNlKSB7XG4gICAgc3VwZXIoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG4gICAgdGhpcy5uYW1lID0gJ1R3aXR0ZXJBUElFcnJvcic7XG4gICAgdGhpcy5lcnJvcnMgPSBvYmo7XG4gIH1cbn1cbiJdfQ==