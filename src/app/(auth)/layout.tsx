function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex items-top justify-center h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-200 to-blue-800">
			<div className="mt-20">{children}</div>
		</div>
	);
}

export default AuthLayout;
