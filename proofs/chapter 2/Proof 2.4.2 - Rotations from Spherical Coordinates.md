## Proof 2.4.2 - Rotations from Spherical Coordinates

In the previous proof, 2.4.1, we derived the new spherical coordinates which arise from performing a rotation around a cartesian axis. This proof will derive the opposite, the rotations which arise from a new pair of spherical coordinates. Every transition from one pair of coordinates to another can be expressed by two (2) rotations around different axes. This proof will only concern deriving the values for XZ rotations.

Any pair of spherical coordinates $(1,\theta,\phi)$ can be transformed to $(1,\theta',\phi')$ by a rotation around the X axis by $\Delta_x$ radians followed by a rotation around the Z axis by $\Delta_z$ radians.

Even though the X rotation is applied first, for the purposes of this derivation we will find $\Delta_z$ first since it is trivial:
$$
\Delta_z=\phi-\phi'
$$
Finding the X rotation value is more involved. To begin, first convert the spherical coordinates to cartesian.
$$
\begin{equation}
\begin{aligned}
x &= 1\ sin\theta\ cos\phi \\
y &= 1\ sin\theta\ sin\phi \\
z &= 1\ cos\theta
\end{aligned}
\end{equation}
$$
Use a plane to intersect the sphere, holding the $x$ value constant.

{insert image}

The intersection of the sphere and the plane is a circle, centered on the X axis, parallel with the YZ plane.

{insert image}

The radius of this circle is calculated by the pythagorean theorem.
$$
\begin{equation}
\begin{aligned}
r &= \sqrt{z^2+y^2}
\end{aligned}
\end{equation}
$$
The cartesian coordinates can also be expressed in polar coordinates with $\omega$ as the angle.
$$
\begin{equation}
\begin{aligned}
y &= r\ cos\omega \\
z &= r\ sin\omega
\end{aligned}
\end{equation}
$$
To rotate counterclockwise by $\Delta$ radians, simply add $\Delta$ to $\omega$ and use the sum of angles trigonometric identity.
$$
\begin{equation}
\begin{aligned}
x_x(\Delta) &= sin\theta\ cos\phi \\
y_x(\Delta) &= r\ cos(\omega+\Delta) = r\ (cos\omega\ cos\Delta-sin\omega\ sin\Delta) \\
z_x(\Delta) &= r\ sin(\omega+\Delta) = r\ (sin\omega\ cos\Delta+cos\omega\ sin\Delta)
\end{aligned}
\end{equation}
$$
To find our new inclination angle, we convert from the new cartesian coordinates.
$$
\begin{equation}
\begin{aligned}
\theta_x(\Delta) &= arctan(\frac{\sqrt{x_x^2+y_x^2}}{z_x}) \\
&= arctan(\frac{\sqrt{sin^2\theta\ cos^2\phi+r^2\ (cos\omega\ cos\Delta-sin\omega\ sin\Delta)^2}}{r\ (sin\omega\ cos\Delta+cos\omega\ sin\Delta)}) \\
&= arctan(\frac{\sqrt{sin^2\theta\ cos^2\phi+(y\ cos\Delta-z\ sin\Delta)^2}}{z\ cos\Delta+y\ sin\Delta}) \\
&= arctan(\frac{\sqrt{sin^2\theta\ cos^2\phi+(sin\theta\ sin\phi\ cos\Delta-cos\theta\ sin\Delta)^2}}{cos\theta\ cos\Delta+sin\theta\ sin\phi\ sin\Delta})
\end{aligned}
\end{equation}
$$
The same process can be used to find the azimuth angle.
$$
\begin{equation}
\begin{aligned}
\phi_x(\Delta) &= arctan(\frac{y_x}{x_x}) \\
&= arctan(\frac{r\ (cos\omega\ cos\Delta-sin\omega\ sin\Delta)}{sin\theta\ cos\phi}) \\
&= arctan(\frac{y\ cos\Delta-z\ sin\Delta}{sin\theta\ cos\phi}) \\
&= arctan(\frac{sin\theta\ sin\phi\ cos\Delta-cos\theta\ sin\Delta}{sin\theta\ cos\phi})
\end{aligned}
\end{equation}
$$
Since the $arctan$ function is an imperfect inverse, these new angles will need to be modified depending on the original inclination and azimuth angles.



### Rotation Around the Y Axis

As with the X rotation, first convert the spherical coordinates to cartesian.
$$
\begin{equation}\begin{aligned}x &= 1\ sin\theta\ cos\phi \\y &= 1\ sin\theta\ sin\phi \\z &= 1\ cos\theta\end{aligned}\end{equation}
$$
Use a plane to intersect the sphere, holding the $y$ value constant.

{insert image}

The intersection of the sphere and the plane is a circle, centered on the Y axis, parallel with the XZ plane.

{insert image}

The radius of this circle is calculated by the pythagorean theorem.


$$
\begin{equation}
\begin{aligned}
r &= \sqrt{z^2+x^2}
\end{aligned}
\end{equation}
$$
The cartesian coordinates can also be expressed in polar coordinates with $\omega$ as the angle.
$$
\begin{equation}\begin{aligned}x &= r\ cos\omega \\z &= r\ sin\omega\end{aligned}\end{equation}
$$
To rotate counterclockwise by $\Delta$ radians, simply add $\Delta$ to $\omega$ and use the sum of angles trigonometric identity.
$$
\begin{equation}\begin{aligned}
x_y(\Delta) &= r\ cos(\omega+\Delta) = r\ (cos\omega\ cos\Delta-sin\omega\ sin\Delta) \\
y_y(\Delta) &= sin\theta\ sin\phi \\
z_y(\Delta) &= r\ sin(\omega+\Delta) = r\ (sin\omega\ cos\Delta+cos\omega\ sin\Delta)
\end{aligned}\end{equation}
$$
To find our new inclination angle, we convert from the new cartesian coordinates.
$$
\begin{equation}\begin{aligned}
\theta_y(\Delta) &= arctan(\frac{\sqrt{x_y^2+y_y^2}}{z_y}) \\
&= arctan(\frac{\sqrt{r^2\ (cos\omega\ cos\Delta-sin\omega\ sin\Delta)^2+sin^2\theta\ sin^2\phi}}{r\ (sin\omega\ cos\Delta+cos\omega\ sin\Delta)}) \\
&= arctan(\frac{\sqrt{(x\ cos\Delta-z\ sin\Delta)^2+sin^2\theta\ sin^2\phi}}{z\ cos\Delta+x\ sin\Delta}) \\
&= arctan(\frac{\sqrt{(sin\theta\ cos\phi\ cos\Delta-cos\theta\ sin\Delta)^2+sin^2\theta\ sin^2\phi}}{cos\theta\ cos\Delta+sin\theta\ cos\phi\ sin\Delta})
\end{aligned}\end{equation}
$$
The same process can be used to find the azimuth angle.
$$
\begin{equation}\begin{aligned}
\phi_y(\Delta) &= arctan(\frac{y_y}{x_y}) \\
&= arctan(\frac{sin\theta\ sin\phi}{r\ (cos\omega\ cos\Delta-sin\omega\ sin\Delta)}) \\
&= arctan(\frac{sin\theta\ sin\phi}{x\ cos\Delta-z\ sin\Delta}) \\
&= arctan(\frac{sin\theta\ sin\phi}{sin\theta\ cos\phi\ cos\Delta-cos\theta\ sin\Delta})
\end{aligned}\end{equation}
$$
Since the $arctan$ function is an imperfect inverse, these new angles will need to be modified depending on the original inclination and azimuth angles.



### Rotation Around the Z Axis

The Z rotation is the easiest one to derive. Rotating by $\Delta$ radians around the Z axis does not change the inclination angle.
$$
\begin{equation}\begin{aligned}
\theta_z &= \theta \\
\phi_z &= \phi + \Delta
\end{aligned}\end{equation}
$$
As with all of these equations, the new azimuth angle must be moved to standard form so it is bounded as $0\leq\phi_z<2\pi$. The inclination angle does not need any editing.

