<div className="links">
					<Link to="/">
//Summary (should it first do a refresh and then display??)
//Full List
//Song Count
Search


				<Link to="/showList"><button onClick={() => this.refreshList()}>Full List</button></Link>
				{/* <button onClick={() => this.showList()}>Full List</button> */}
				{/* <Link to="/showList"><button>Full List</button></Link> */}
				<Link to="/"><button onClick={() => this.countBy()}>Song Count</button></Link>
				{/* <button onClick={() => this.refreshList()}>Refresh</button> */}
				</Link>
				<Link to="/about"><button>About</button></Link>
				</div>